-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('NORMAL_USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "IncidentType" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_ASSIGNED', 'ASSIGNED', 'ACKNOWLEDGED', 'RESOLVED');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userRoles" "UserRole"[] DEFAULT ARRAY['NORMAL_USER']::"UserRole"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "IncidentType" NOT NULL DEFAULT 'MEDIUM',
    "creator_id" UUID,
    "assignee_id" UUID,
    "status" "Status" NOT NULL DEFAULT 'NOT_ASSIGNED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "index_user_on_email" ON "User"("email");

-- CreateIndex
CREATE INDEX "index_user_on_password" ON "User"("password");

-- CreateIndex
CREATE INDEX "index_user_on_created_at" ON "User"("created_at");

-- CreateIndex
CREATE INDEX "index_user_on_updated_at" ON "User"("updated_at");

-- CreateIndex
CREATE INDEX "index_incident_on_title" ON "Incident"("title");

-- CreateIndex
CREATE INDEX "index_incident_on_description" ON "Incident"("description");

-- CreateIndex
CREATE INDEX "index_incident_on_type" ON "Incident"("type");

-- CreateIndex
CREATE INDEX "index_incident_on_creator_id" ON "Incident"("creator_id");

-- CreateIndex
CREATE INDEX "index_incident_on_assignee_id" ON "Incident"("assignee_id");

-- CreateIndex
CREATE INDEX "index_incident_on_status" ON "Incident"("status");

-- CreateIndex
CREATE INDEX "index_incident_on_created_at" ON "Incident"("created_at");

-- CreateIndex
CREATE INDEX "index_incident_on_updated_at" ON "Incident"("updated_at");

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
