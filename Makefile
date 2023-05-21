lint_fix:
	docker-compose run --rm local npm run lint:fix
build_ssg:
	docker-compose run --rm local npm run build
	docker-compose run --rm local npm run export
