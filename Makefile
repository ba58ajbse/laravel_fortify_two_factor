dev:
	./vendor/bin/sail npm run dev

watch:
	./vendor/bin/sail npm run watch

route:
	./vendor/bin/sail php artisan route:list

cache:
	./vendor/bin/sail php artisan config:cache
	./vendor/bin/sail php artisan route:cache
	./vendor/bin/sail php artisan view:cache

npm_test:
	./vendor/bin/sail npm run test

phpunit:
	./vendor/bin/sail test

fresh_seed:
	./vendor/bin/sail php artisan migrate:fresh --seed

php-cs-fix-version:
	docker-compose exec laravel.test ./tools/php-cs-fixer/vendor/bin/php-cs-fixer --version

php-cs-fix-dry-run:
	docker-compose exec laravel.test ./tools/php-cs-fixer/vendor/bin/php-cs-fixer fix --config=.php-cs-fixer.dist.php -v --dry-run

php-cs-fix-dry-run-diff:
	docker-compose exec laravel.test ./tools/php-cs-fixer/vendor/bin/php-cs-fixer fix --config=.php-cs-fixer.dist.php -v --diff --dry-run

php-cs-fix:
	docker-compose exec laravel.test ./tools/php-cs-fixer/vendor/bin/php-cs-fixer fix --config=.php-cs-fixer.dist.php -v

analyse:
	docker-compose exec laravel.test ./vendor/bin/phpstan analyse
