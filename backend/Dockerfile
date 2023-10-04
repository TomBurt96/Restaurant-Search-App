#use python image as base
FROM python:3.12

#create directory for backend
RUN mkdir -p /backend
WORKDIR /backend

#Copy directory into backend
COPY . ./

#install pipenv for virtual environment
RUN pip install -U pipenv

RUN pipenv sync --system

EXPOSE 8000

#Run Command
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
