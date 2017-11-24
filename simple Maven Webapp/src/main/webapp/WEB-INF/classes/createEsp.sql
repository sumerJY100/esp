/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2014/4/1 14:35:31                            */
/*==============================================================*/


drop table if exists user_table;

/*==============================================================*/
/* Table: user_table                                            */
/*==============================================================*/
create table user_table
(
   id                   int not null,
   num                  varchar(20),
   name                 varchar(50),
   login_name           varchar(50),
   long_pwd             varchar(50),
   state                int,
   primary key (id)
);

