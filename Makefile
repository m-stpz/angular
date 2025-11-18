
.PHONY: gitpush
gitpush:
	@if [ -z "$(msg)" ]; then \
		echo "Usage: make gitpush msg=\"Your commit message\""; \
		exit 1; \
	fi
	git add .
	git commit -m "$(msg)"
	git push
