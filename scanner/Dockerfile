FROM python:3.11-alpine

WORKDIR /app
# 阿里云镜像加速
RUN apk add --no-cache \
    --repository https://mirrors.aliyun.com/alpine/v3.19/main/ \
    --repository https://mirrors.aliyun.com/alpine/v3.19/community/ \
    --virtual .build-deps gcc musl-dev libffi-dev
    pip install --no-cache-dir -i https://mirrors.aliyun.com/pypi/simple/ \
    cisco-ai-skill-scanner && \
    apk del .build-deps && \
    addgroup -S app && \
    adduser -S app -G app && \
    mkdir -p /tmp/skillhub-scans && \
    chown app:app /tmp/skillhub-scans

USER app

EXPOSE 8000

HEALTHCHECK --interval=10s --timeout=3s \
  CMD wget -qO- http://127.0.0.1:8000/health || exit 1

CMD ["skill-scanner-api", "--host", "0.0.0.0", "--port", "8000"]
