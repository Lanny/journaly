# Migration `20200328162147-init`

This migration has been generated by Robin MacPherson at 3/28/2020, 4:21:47 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
    "CreatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "Email" text  NOT NULL DEFAULT '',
    "Id" text  NOT NULL ,
    "Name" text  NOT NULL DEFAULT '',
    "Password" text  NOT NULL DEFAULT '',
    "ResetToken" text   ,
    "ResetTokenExpiry" Decimal(65,30)   ,
    "UpdatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "status" "Status"[]  ,
    PRIMARY KEY ("Id")
)

CREATE TABLE "public"."Post" (
    "Body" text  NOT NULL DEFAULT '',
    "CreatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "Id" text  NOT NULL ,
    "Image" text   ,
    "LargeImage" text   ,
    "Published" boolean  NOT NULL DEFAULT false,
    "Title" text  NOT NULL DEFAULT '',
    "UpdatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "author" text  NOT NULL ,
    PRIMARY KEY ("Id")
)

CREATE UNIQUE INDEX "User.Email" ON "public"."User"("Email")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("author")REFERENCES "public"."User"("Id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200328162147-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,37 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator prisma_client {
+  provider = "prisma-client-js"
+}
+
+enum Status {
+  ADMIN MODERATOR FREE_USER PRO_USER
+}
+
+model User {
+  Id               String   @id @default(cuid())
+  Name             String
+  Email            String   @unique
+  Password         String
+  ResetToken       String?
+  ResetTokenExpiry Float?
+  status           Status[]
+  posts            Post[]
+  CreatedAt        DateTime @default(now())
+  UpdatedAt        DateTime @updatedAt
+}
+
+model Post {
+  Id         String   @id @default(cuid())
+  Title      String
+  Body       String
+  Published  Boolean
+  Image      String?
+  LargeImage String?
+  CreatedAt  DateTime @default(now())
+  UpdatedAt  DateTime @updatedAt
+  author     User
+}
```