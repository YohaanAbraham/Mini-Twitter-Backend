CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS users (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
username TEXT UNIQUE NOT NULL,
email TEXT UNIQUE NOT NULL,
password_hash TEXT NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TABLE IF NOT EXISTS tweets (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
content TEXT NOT NULL CHECK (char_length(content) <= 280),
created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TABLE IF NOT EXISTS follows (
follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
followee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
PRIMARY KEY (follower_id, followee_id),
CHECK (follower_id <> followee_id)
);


CREATE TABLE IF NOT EXISTS likes (
user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
tweet_id UUID NOT NULL REFERENCES tweets(id) ON DELETE CASCADE,
created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
PRIMARY KEY (user_id, tweet_id)
);


-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_tweets_user_created ON tweets (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_likes_tweet ON likes (tweet_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows (follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_followee ON follows (followee_id);
