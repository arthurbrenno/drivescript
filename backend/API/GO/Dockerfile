FROM golang:1.19.0

WORKDIR /usr/src/app

# Copy go.mod and go.sum separately to leverage Docker cache
COPY go.mod .
COPY go.sum .

# Tidy go modules
RUN go mod tidy

# Install air for hot-reloading
RUN go install github.com/cosmtrek/air@latest

# Copy the rest of the application code
COPY . .

# Build the application
RUN go build -o /usr/src/app/tmp/main ./cmd

# Set the PATH to include the directory where air is installed
ENV PATH="/go/bin:${PATH}"

CMD ["air", "run", "cmd/main.go", "0.0.0.0"]
