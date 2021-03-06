# Migration `20200408071119-init`

This migration has been generated by Robin MacPherson at 4/8/2020, 7:11:19 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MODERATOR', 'FREE_USER', 'PRO_USER');

CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED');

CREATE TYPE "SocialMediaPlatform" AS ENUM ('FACEBOOK', 'YOUTUBE', 'INSTAGRAM', 'LINKEDIN');

CREATE TABLE "public"."User" (
    "Bio" text   ,
    "CreatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "Email" text  NOT NULL DEFAULT '',
    "Handle" text  NOT NULL DEFAULT '',
    "Id" text  NOT NULL ,
    "Name" text  NOT NULL DEFAULT '',
    "Password" text  NOT NULL DEFAULT '',
    "ResetToken" text   ,
    "ResetTokenExpiry" Decimal(65,30)   ,
    "UpdatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "location" text   ,
    "userRole" "UserRole" NOT NULL DEFAULT 'FREE_USER',
    PRIMARY KEY ("Id")
)

CREATE TABLE "public"."SocialMedia" (
    "Id" text  NOT NULL ,
    "platform" "SocialMediaPlatform" NOT NULL DEFAULT 'FACEBOOK',
    "url" text  NOT NULL DEFAULT '',
    "user" text   ,
    PRIMARY KEY ("Id")
)

CREATE TABLE "public"."Post" (
    "Body" text  NOT NULL DEFAULT '',
    "CreatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "Id" text  NOT NULL ,
    "LargeImage" text   ,
    "Latitude" Decimal(65,30)   ,
    "Longitude" Decimal(65,30)   ,
    "ReadCount" integer  NOT NULL DEFAULT 0,
    "ReadTime" integer  NOT NULL DEFAULT 1,
    "Title" text  NOT NULL DEFAULT '',
    "UpdatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "author" text  NOT NULL ,
    "interest" text   ,
    "language" text   ,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    PRIMARY KEY ("Id")
)

CREATE TABLE "public"."Location" (
    "City" text  NOT NULL DEFAULT '',
    "Country" text  NOT NULL DEFAULT '',
    "Id" text  NOT NULL ,
    PRIMARY KEY ("Id")
)

CREATE TABLE "public"."Topic" (
    "Id" text  NOT NULL ,
    "Name" text  NOT NULL DEFAULT '',
    "user" text   ,
    PRIMARY KEY ("Id")
)

CREATE TABLE "public"."Like" (
    "CreatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "Id" text  NOT NULL ,
    "UpdatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "author" text  NOT NULL ,
    "post" text  NOT NULL ,
    PRIMARY KEY ("Id")
)

CREATE TABLE "public"."Comment" (
    "Body" text  NOT NULL DEFAULT '',
    "CreatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "Id" text  NOT NULL ,
    "Position" text  NOT NULL DEFAULT '',
    "UpdatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "author" text  NOT NULL ,
    "post" text  NOT NULL ,
    PRIMARY KEY ("Id")
)

CREATE TABLE "public"."Interest" (
    "Id" text  NOT NULL ,
    "Name" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("Id")
)

CREATE TABLE "public"."Language" (
    "Dialect" text   ,
    "Id" text  NOT NULL ,
    "Name" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("Id")
)

CREATE TABLE "public"."Image" (
    "Id" text  NOT NULL ,
    "largeSize" text  NOT NULL DEFAULT '',
    "post" text   ,
    "smallSize" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("Id")
)

CREATE TABLE "public"."_LanguageToNative" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL
)

CREATE TABLE "public"."_LanguageToLearner" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL
)

CREATE TABLE "public"."_PostToTopic" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL
)

CREATE UNIQUE INDEX "User.Email" ON "public"."User"("Email")

CREATE UNIQUE INDEX "User.Handle" ON "public"."User"("Handle")

CREATE UNIQUE INDEX "_LanguageToNative_AB_unique" ON "public"."_LanguageToNative"("A","B")

CREATE  INDEX "_LanguageToNative_B_index" ON "public"."_LanguageToNative"("B")

CREATE UNIQUE INDEX "_LanguageToLearner_AB_unique" ON "public"."_LanguageToLearner"("A","B")

CREATE  INDEX "_LanguageToLearner_B_index" ON "public"."_LanguageToLearner"("B")

CREATE UNIQUE INDEX "_PostToTopic_AB_unique" ON "public"."_PostToTopic"("A","B")

CREATE  INDEX "_PostToTopic_B_index" ON "public"."_PostToTopic"("B")

ALTER TABLE "public"."User" ADD FOREIGN KEY ("location")REFERENCES "public"."Location"("Id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."SocialMedia" ADD FOREIGN KEY ("user")REFERENCES "public"."User"("Id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("author")REFERENCES "public"."User"("Id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("language")REFERENCES "public"."Language"("Id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("interest")REFERENCES "public"."Interest"("Id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Topic" ADD FOREIGN KEY ("user")REFERENCES "public"."User"("Id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Like" ADD FOREIGN KEY ("author")REFERENCES "public"."User"("Id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Like" ADD FOREIGN KEY ("post")REFERENCES "public"."Post"("Id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("author")REFERENCES "public"."User"("Id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("post")REFERENCES "public"."Post"("Id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Image" ADD FOREIGN KEY ("post")REFERENCES "public"."Post"("Id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."_LanguageToNative" ADD FOREIGN KEY ("A")REFERENCES "public"."Language"("Id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_LanguageToNative" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("Id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_LanguageToLearner" ADD FOREIGN KEY ("A")REFERENCES "public"."Language"("Id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_LanguageToLearner" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("Id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_PostToTopic" ADD FOREIGN KEY ("A")REFERENCES "public"."Post"("Id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_PostToTopic" ADD FOREIGN KEY ("B")REFERENCES "public"."Topic"("Id") ON DELETE CASCADE  ON UPDATE CASCADE

DROP TYPE "Status"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200408071119-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,118 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator prisma_client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  Id                String        @id @default(cuid())
+  Name              String
+  Email             String        @unique
+  Handle            String        @unique
+  Password          String
+  userRole          UserRole      @default(FREE_USER)
+  ResetToken        String?
+  ResetTokenExpiry  Float?
+  Bio               String?
+  posts             Post[]
+  socialMedia       SocialMedia[]
+  interests         Topic[]
+  location          Location?
+  languagesNative   Language[]    @relation("LanguageToNative")
+  languagesLearning Language[]    @relation("LanguageToLearner")
+  CreatedAt         DateTime      @default(now())
+  UpdatedAt         DateTime      @updatedAt
+}
+
+model SocialMedia {
+  Id       String              @id @default(cuid())
+  platform SocialMediaPlatform
+  url      String
+}
+
+model Post {
+  Id         String     @id @default(cuid())
+  Title      String
+  Body       String
+  status     PostStatus @default(DRAFT)
+  images     Image[]
+  LargeImage String?
+  CreatedAt  DateTime   @default(now())
+  UpdatedAt  DateTime   @updatedAt
+  author     User
+  ReadCount  Int        @default(0)
+  ReadTime   Int        @default(1)
+  likes      Like[]
+  comments   Comment[]
+  topic      Topic[]
+  language   Language?
+  // TEMPORARY
+  Longitude  Float?
+  Latitude   Float?
+}
+
+model Location {
+  Id      String @id @default(cuid())
+  Country String
+  City    String
+}
+
+model Topic {
+  Id    String @id @default(cuid())
+  Name  String
+  posts Post[]
+}
+
+model Like {
+  Id        String   @id @default(cuid())
+  CreatedAt DateTime @default(now())
+  UpdatedAt DateTime @updatedAt
+  author    User
+  post      Post
+}
+
+model Comment {
+  Id        String   @id @default(cuid())
+  CreatedAt DateTime @default(now())
+  UpdatedAt DateTime @updatedAt
+  Body      String
+  Position  String
+  author    User
+  post      Post
+}
+
+model Interest {
+  Id    String @id @default(cuid())
+  Name  String
+  posts Post[]
+}
+
+model Language {
+  Id            String  @id @default(cuid())
+  posts         Post[]
+  Name          String
+  Dialect       String?
+  nativeUsers   User[]  @relation("LanguageToNative")
+  learningUsers User[]  @relation("LanguageToLearner")
+}
+
+model Image {
+  Id        String  @id @default(cuid())
+  smallSize String
+  largeSize String
+}
+
+enum UserRole {
+  ADMIN MODERATOR FREE_USER PRO_USER
+}
+
+enum PostStatus {
+  DRAFT PUBLISHED
+}
+
+enum SocialMediaPlatform {
+  FACEBOOK YOUTUBE INSTAGRAM LINKEDIN
+}
```
