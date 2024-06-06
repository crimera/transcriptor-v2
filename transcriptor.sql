-- create database transcriptordb;
use transcriptordb;
create table history_tbl(
	`id` int not null auto_increment,
	`transcriptions` json,
	primary key (`id`)
);

