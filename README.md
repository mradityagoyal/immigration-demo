# immigration-demo

## Prerequisites

- [Flyctl](https://fly.io/docs/getting-started/installing-flyctl/): Make sure you have Flyctl CLI installed to interact with Fly.io.

## Deployment

### 1. Install Flyctl

Make sure you have Flyctl installed. You can download and install it from the official Fly.io documentation:

- [Installing Flyctl](https://fly.io/docs/getting-started/installing-flyctl/)

### 2. Login to Fly.io

Before deploying your project, you'll need to login to Fly.io using the command-line tool:

```bash
flyctl auth login
```

### 3. Configure Fly.toml

Create a `Fly.toml` file in the root of your project to configure the deployment settings. Here's a basic example:

```toml
# Fly.toml
app = "<YOUR_PROJECT_NAME>"

kill_signal = "SIGINT"
kill_timeout = 5

[[services]]
  internal_port = 8000
  protocol = "tcp"

  [services.concurrency]
    hard_limit = 25
    soft_limit = 20

  [[services.ports]]
    handlers = ["http"]
    port = "80"

  [[services.ports]]
    handlers = ["tls", "http"]
    port = "443"

  [[services.tcp_checks]]
    interval = 10000
    timeout = 2000
```

You can customize the configuration according to your project requirements. Refer to the [Fly.io Configuration](https://fly.io/docs/reference/configuration/) documentation for more options.

### 4. Deploy Your Project

Use the following command to deploy your project to Fly.io:

```bash
flyctl deploy
```

Follow the on-screen instructions to deploy your application.

## Scaling

By default, Fly.io will automatically scale your application based on the incoming traffic. However, you can also manually scale your application using the following command:

```bash
flyctl scale count <NUM_INSTANCES>
```

Replace `<NUM_INSTANCES>` with the number of instances you want to run.

## Monitoring and Logs

You can monitor your deployed application and access logs using Flyctl:

```bash
flyctl logs
```

## Documentation

For more details on deploying and managing your application on Fly.io, check the official documentation:

- [Fly.io Documentation](https://fly.io/docs/)
