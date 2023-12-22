FROM golang:1.16-alpine as builder

WORKDIR /app
COPY . .
RUN go build script.go

FROM scratch
COPY --from=builder /app/script /script
ENTRYPOINT ["/script"]
