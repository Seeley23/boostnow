CREATE TABLE `aio_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`domain` varchar(255) NOT NULL,
	`industry` varchar(255),
	`status` enum('new','contacted','closed') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `aio_leads_id` PRIMARY KEY(`id`)
);
