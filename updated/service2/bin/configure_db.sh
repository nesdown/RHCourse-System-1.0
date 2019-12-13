#!/bin/bash

echo "Configuring service2_db..."

dropdb -U service2 -h localhost service2_db
createdb -U service2 -h localhost service2_db

psql -U service2 -h localhost service2_db < ./bin/sql/course.sql

echo "service2_db configured."