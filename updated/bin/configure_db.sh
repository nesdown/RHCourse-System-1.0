#!/bin/bash

echo "Configuring rh_course_system_db..."

dropdb -U main_service -h localhost rh_course_system_db
createdb -U main_service -h localhost rh_course_system_db

psql -U main_service -h localhost rh_course_system_db < ./bin/sql/course.sql

echo "rh_course_system_db configured."