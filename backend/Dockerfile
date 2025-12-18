#use python image as base
FROM python:latest

#create directory for backend
RUN mkdir -p /backend
WORKDIR /backend

#Copy directory into backend
COPY . ./

#install pipenv for virtual environment
RUN pip install -U pipenv

RUN pipenv sync --system

RUN apt-get update && apt-get install -y netcat-openbsd

EXPOSE 8000

#Run Command
CMD ["./init.sh"]
