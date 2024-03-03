-- Helper Function 2 (update_image_tag_score)
-- DROP FUNCTION IF EXISTS update_image_tag_score(int8, int8, int, double precision, text);
CREATE OR REPLACE FUNCTION update_image_tag_score(emb vector, image_id int8, tag_id int8, adjustment int, threshold double precision, model_name text) RETURNS void AS $$
DECLARE
BEGIN
    UPDATE "ImageTagScores" it
    SET score = score + adjustment * least(1, t.similarity) 
    FROM  (
            SELECT ie."imageId" as id, (1 - (ie.embedding <=> emb)) as similarity
            FROM "ImageEmbedding" ie
            WHERE (1 - (ie.embedding <=> emb)) >= threshold 
            AND ie.model = model_name 
    ) t
    WHERE it."imageId" = t.id
    AND it."tagId" = tag_id;
END;
$$ LANGUAGE plpgsql; 

-- Helper Function 3 (insert_image_tag_score)
-- DROP FUNCTION IF EXISTS insert_image_tag_score(int8, int8, int, double precision, text);
CREATE OR REPLACE FUNCTION insert_image_tag_score(emb vector, image_id int8, tag_id int8, adjustment int, threshold double precision, model_name text) RETURNS void AS $$
DECLARE
BEGIN
    INSERT INTO "ImageTagScores" ("imageId", "tagId", score)
    SELECT t.id, tag_id, adjustment * least(1, t.similarity)
    FROM  (
            SELECT ie."imageId" as id, (1 - (ie.embedding <=> emb)) as similarity
            FROM "ImageEmbedding" ie
            WHERE (1 - (ie.embedding <=> emb)) >= threshold 
            AND ie.model = model_name
    ) t;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_image_tag_scores() RETURNS trigger AS $$
DECLARE
    threshold double precision := 0.25; 
    emb vector; 
    existing boolean;
    score_adjustment integer; 
    model_ text = 'dinov2';
BEGIN
    SELECT embedding INTO emb FROM "ImageEmbedding" WHERE "imageId" = 
        CASE WHEN TG_OP = 'DELETE' THEN OLD.image_id ELSE NEW.image_id END AND model = model_; 

    -- Handle INSERT/UPDATE Cases
    score_adjustment := CASE WHEN NEW.value THEN 1 ELSE -1 END;
    IF OLD.value IS NOT NULL THEN -- Adjust for pre-existing value
        score_adjustment := score_adjustment + (CASE WHEN OLD.value THEN -1 ELSE 1 END); 
    END IF;

    SELECT EXISTS(
        SELECT * FROM "ImageTagScores"
        WHERE "imageId" = NEW.image_id AND "tagId" = NEW.tag_id
    ) INTO existing;

    IF existing THEN 
        PERFORM update_image_tag_score(emb, NEW.image_id, NEW.tag_id, score_adjustment, threshold, model_); 
    ELSE
        PERFORM insert_image_tag_score(emb, NEW.image_id, NEW.tag_id, score_adjustment, threshold, model_);
    END IF;

    RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END; 
END;
$$ LANGUAGE plpgsql;


-- Trigger (Unchanged) 
CREATE OR REPLACE TRIGGER update_image_tag_scores_trigger
AFTER INSERT OR UPDATE ON "ImageTags" FOR EACH ROW
EXECUTE FUNCTION update_image_tag_scores();
