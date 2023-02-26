-- CreateTable
CREATE TABLE "CollectionLocations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectionLocations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollectionLocations" ADD CONSTRAINT "CollectionLocations_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "Cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
