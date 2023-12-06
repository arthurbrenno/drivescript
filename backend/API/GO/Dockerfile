FROM golang:1.19.0

WORKDIR /usr/src/app

COPY go.mod .
COPY go.sum .

RUN go mod tidy

RUN go install github.com/cosmtrek/air@latest

COPY . .

RUN go build -o /usr/src/app/tmp/main ./cmd

ENV PATH="/go/bin:${PATH}"

CMD ["air", "run", "cmd/main.go", "0.0.0.0"]
