CREATE TABLE `blog_ratings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`articleId` int NOT NULL,
	`rating` int NOT NULL,
	`feedback` text,
	`userIp` varchar(45),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `blog_ratings_id` PRIMARY KEY(`id`)
);
