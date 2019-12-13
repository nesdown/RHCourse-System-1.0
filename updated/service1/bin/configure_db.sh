#!/bin/bash

echo "Configuring service1_db..."

dropdb -U service1 -h localhost service1_db
createdb -U service1 -h localhost service1_db

psql -U service1 -h localhost service1_db < ./bin/sql/course.sql

echo "service1_db configured."