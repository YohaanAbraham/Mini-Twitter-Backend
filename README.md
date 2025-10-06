# Mini-Twitter-Backend
A production‑ready backend that implements core Twitter features: auth, posting, following, timelines, likes. Includes Redis caching for feed retrieval, Docker Compose, SQL migrations, and a GitHub Actions CI pipeline.

# Mini Twitter Backend (Express.js, PostgreSQL, Redis)


Implements core Twitter features (auth, posts, follows, timeline, likes) with Redis caching to speed up feed retrieval.


## Quick Start


```bash
# 1) Start infra
docker-compose up -d


# 2) Set env
cp .env.example .env
# (edit if needed)


# 3) Run migration
npm run migrate


# 4) Install & start API
npm install
npm run dev
