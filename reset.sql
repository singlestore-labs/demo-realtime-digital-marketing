drop database if exists s2cellular;
create database s2cellular; -- partitions 64;
use s2cellular;

source schema.sql;
source procedures.sql
source credentials.sql;
source pipelines.sql;