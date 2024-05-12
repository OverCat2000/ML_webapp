FROM python:3.12.3-alpine
WORKDIR /server
COPY . /server
RUN apk add --no-cache --update g++ musl-dev
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "App.py"]

