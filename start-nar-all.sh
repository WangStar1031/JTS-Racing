#!/bin/sh

kill $(ps aux | grep '[p]hp' | awk '{print $2}')

cd /var/www/html/JTS

php odds_special_nar.php > /dev/null 2>&1 &
php odds_special_jra.php > /dev/null 2>&1 &

php odds_special_nar2.php 1 > /dev/null 2>&1 &
php odds_special_nar2.php 2 > /dev/null 2>&1 &
php odds_special_nar2.php 3 > /dev/null 2>&1 &
php odds_special_nar2.php 4 > /dev/null 2>&1 &
php odds_special_nar2.php 5 > /dev/null 2>&1 &

php odds_special_jra2.php 1 > /dev/null 2>&1 &
php odds_special_jra2.php 2 > /dev/null 2>&1 &
php odds_special_jra2.php 3 > /dev/null 2>&1 &
php odds_special_jra2.php 4 > /dev/null 2>&1 &
php odds_special_jra2.php 5 > /dev/null 2>&1 &

php realtime_nar.php > /dev/null 2>&1 &
php realtime_nar2.php > /dev/null 2>&1 &
php realtime_jra.php > /dev/null 2>&1 &
php realtime_jra2.php > /dev/null 2>&1 &

php scratch_mailer.php > /dev/null 2>&1 &

php check_page_keiba.php > /dev/null 2>&1 &
php check_page_rakuten.php > /dev/null 2>&1 &
php check_page_jra.php > /dev/null 2>&1 &
php check_page_netkeiba.php > /dev/null 2>&1 &

php steward_report.php > /dev/null 2>&1 &

cd /var/www/html/jraminer

php description.php > /dev/null 2>&1 &

cd /var/www/html/JTS/library

php trans_calc.php >  /dev/null 2>&1 &

sudo chmod 777 /var/www/html/JTS/*.json
sudo chmod 777 /var/www/html/JTS/*.log

