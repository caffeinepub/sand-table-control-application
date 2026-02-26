# Controller Protocol

## Command Format

Commands are sent as plain text strings over HTTP POST or WebSocket.

## Command Reference

### Run Control

| Command | Description | Parameters | Response |
|---------|-------------|------------|----------|
| `R` | Run/Resume pattern | None | `{success: true}` |
| `P` | Pause pattern | None | `{success: true}` |
| `S` | Stop pattern | None | `{success: true}` |
| `H` | Home machine | None | `{success: true}` |
| `T` | Retrace last pattern | None | `{success: true}` |

### Pattern Selection

| Command | Description | Parameters | Response |
|---------|-------------|------------|----------|
| `P<n>` | Select pattern by ID | `n`: pattern ID | `{success: true}` |

Example: `P1` selects pattern 1

### LED Control

| Command | Description | Parameters | Response |
|---------|-------------|------------|----------|
| `LED:R,G,B,BR,MODE` | Set LED state | R,G,B: 0-255<br>BR: brightness 0-255<br>MODE: static/breathing/rainbow/pattern-sync | `{success: true}` |

Example: `LED:255,100,50,200,static`

### Speed Control

| Command | Description | Parameters | Response |
|---------|-------------|------------|----------|
| `SPD:XXX` | Set speed | XXX: speed in mm/min | `{success: true}` |

Example: `SPD:1000`

### G-Code Upload

| Command | Description | Parameters | Response |
|---------|-------------|------------|----------|
| `UPLOAD:<gcode>` | Upload G-code | Full G-code text | `{success: true}` |

## Status Endpoint

### GET /status

Returns current machine status:

