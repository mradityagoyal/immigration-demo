# Use the Python 3 base image
FROM python:3

# Set the working directory to /app
WORKDIR /app

# Copy the contents of the current directory into the container's working directory
COPY . /app

# Install backend Python dependencies
RUN pip install --no-cache-dir -r immigration-demo-backend/requirements.txt

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Install Angular CLI
RUN npm install -g @angular/cli

# npm install for backend
RUN cd /app/immigration-demo-backend && npm install

# npm install for frontend and build the frontend
RUN cd /app/immigration-demo-frontend && npm install && ng build

# Expose the port used by the application (if needed)
EXPOSE 8000

# Change to the immigration-demo-backend directory
WORKDIR /app/immigration-demo-backend

# Start the backend server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
