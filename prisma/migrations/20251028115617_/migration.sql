-- CreateTable
CREATE TABLE `MangaComment` (
    `id` VARCHAR(191) NOT NULL,
    `title` TEXT NOT NULL DEFAULT '',
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isEdited` BOOLEAN NOT NULL DEFAULT false,
    `reactions` INTEGER NOT NULL DEFAULT 0,
    `userId` VARCHAR(191) NOT NULL,
    `mangaId` VARCHAR(191) NOT NULL,

    INDEX `MangaComment_userId_idx`(`userId`),
    INDEX `MangaComment_mangaId_idx`(`mangaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChapterComment` (
    `id` VARCHAR(191) NOT NULL,
    `title` TEXT NOT NULL DEFAULT '',
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isEdited` BOOLEAN NOT NULL DEFAULT false,
    `reactions` INTEGER NOT NULL DEFAULT 0,
    `userId` VARCHAR(191) NOT NULL,
    `chapterId` VARCHAR(191) NOT NULL,
    `chapterNumber` VARCHAR(191) NOT NULL DEFAULT 'Oneshot',

    INDEX `ChapterComment_userId_idx`(`userId`),
    INDEX `ChapterComment_chapterId_idx`(`chapterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chapter` (
    `mangadexId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Chapter_mangadexId_idx`(`mangadexId`),
    PRIMARY KEY (`mangadexId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MangaComment` ADD CONSTRAINT `MangaComment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MangaComment` ADD CONSTRAINT `MangaComment_mangaId_fkey` FOREIGN KEY (`mangaId`) REFERENCES `Manga`(`mangadexId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChapterComment` ADD CONSTRAINT `ChapterComment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChapterComment` ADD CONSTRAINT `ChapterComment_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `Chapter`(`mangadexId`) ON DELETE RESTRICT ON UPDATE CASCADE;
