# Error Handling Strategy

## Error Categories

### 1. Network Errors

**Sources**:
- HTTP request timeout
- WebSocket connection failure
- Controller unreachable

**Handling**:
- Display toast notification with error message
- Update connection status badge to "Disconnected"
- Store last error in connection store
- Allow user to retry via "Test Connection"

**User Experience**:
- Non-blocking: user can continue using offline features
- Clear error messages (e.g., "Connection timeout")
- Visual feedback via status badge

### 2. Command Errors

**Sources**:
- Invalid command format
- Hardware fault (motor, limit switch)
- SD card missing

**Handling**:
- Parse error response from controller
- Display specific error in toast
- Disable affected controls
- Log error for debugging

**User Experience**:
- Immediate feedback via toast
- Controls remain accessible for retry
- Error persists in dashboard if critical

### 3. Authorization Errors

**Sources**:
- Not logged in (for cloud features)
- Insufficient permissions
- Session expired

**Handling**:
- Catch backend `Debug.trap` errors
- Display login prompt for cloud features
- Clear cached data on logout
- Graceful degradation to local features

**User Experience**:
- Cloud features show login prompt
- Local features remain accessible
- Clear messaging about authentication requirement

### 4. Validation Errors

**Sources**:
- Empty pattern name
- Invalid G-code
- Missing required fields

**Handling**:
- Client-side validation before submission
- Display inline error messages
- Disable submit until valid
- Preserve user input

**User Experience**:
- Immediate feedback on form fields
- Clear validation messages
- No data loss

## Error Display Mechanisms

### Toast Notifications (Primary)
- Used for: Command results, network errors, validation errors
- Duration: 3-5 seconds
- Position: Bottom-right (mobile-friendly)
- Variants: Success, Error, Info

### Status Badge
- Used for: Connection status
- Location: Settings page header
- States: Connected, Disconnected, Connecting
- Click to view last error details

### Alert Banners
- Used for: Critical machine errors
- Location: Dashboard page
- Persistent until cleared by status update
- Variants: Destructive (red)

### Inline Messages
- Used for: Form validation
- Location: Below form fields
- Persistent until corrected

## Recovery Flows

### Connection Lost
1. Detect timeout/error
2. Update status to "Disconnected"
3. Show toast: "Connection lost"
4. User navigates to Settings
5. User clicks "Test Connection"
6. If successful, status updates to "Connected"

### Pattern Interrupted
1. Detect app reload during run
2. Check stored session + fresh status
3. Show "Resume Pattern?" dialog
4. User chooses Resume or Stop
5. Send appropriate command
6. Clear session on Stop

### Authentication Expired
1. Detect 401/403 from backend
2. Clear identity and cached data
3. Show login prompt
4. User re-authenticates
5. Retry failed operation

## Logging

- Console errors for debugging (development only)
- No sensitive data in logs
- Network errors include request details
- Command errors include command type

## Best Practices

1. **Never crash the app**: All errors caught and handled
2. **User-friendly messages**: No technical jargon
3. **Actionable feedback**: Tell user what to do next
4. **Preserve state**: Don't lose user work on error
5. **Graceful degradation**: Offline features remain usable
