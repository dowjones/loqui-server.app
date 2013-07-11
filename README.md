
![Loqui](/loqui.png)

# NAME
loqui-server(1)

# SYNOPSIS
A very simple server for accepting logs from [`loqui-client(3)`][1]

# API

## Methods

### loqui.createServer([options])

#### [event] `log`
Fired when a log is written to the server

#### [event] `error`
Fired when there is an error on the server.

#### [method] `close()`
Closes the server.

# SEE ALSO
[`loqui-client(3)`][1]

[1]:https://github.com/dowjones/loqui-client
