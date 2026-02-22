# Admin Notification System

## Overview
The admin notification system is designed to automatically notify administrators when new orders are placed in the system. The notification bell appears in the admin dashboard header (both mobile and desktop views).

## Features

### 1. **Notification Bell Icon**
- Located in the top-right corner of the admin dashboard
- Shows a red badge with the count of unread notifications
- Badge animates with a pulse effect to draw attention
- Click to open the dropdown with all notifications

### 2. **Notification Dropdown**
- Displays all notifications in reverse chronological order (newest first)
- Shows notification title, message, and timestamp
- Unread notifications have a blue background
- Each notification has a blue dot indicator when unread
- Relative timestamps (e.g., "5m ago", "2h ago", "3d ago")

### 3. **Notification Actions**
- **Individual Actions:**
  - Click on a notification to mark it as read
  - Click the X icon to remove a specific notification
  
- **Bulk Actions:**
  - ✓ icon - Mark all notifications as read
  - X icon - Clear all notifications

### 4. **Automatic Order Detection**
- Polls the backend every 30 seconds for new orders
- Automatically creates a notification when a new order is detected
- Notification includes:
  - Customer name
  - Order amount
  - Prompt to process the order

### 5. **Persistent Storage**
- Notifications are saved to browser localStorage
- Notifications persist across page refreshes
- Unread count is maintained even after closing the browser

## Technical Implementation

### Files Created/Modified

1. **`/store/admin/notificationStore.js`**
   - Zustand store managing notification state
   - Handles adding, reading, and clearing notifications
   - Uses persist middleware for localStorage persistence

2. **`/components/admin/NotificationBell.js`**
   - React component for the notification bell and dropdown
   - Handles UI interactions and displays notifications
   - Includes click-outside detection to close dropdown

3. **`/hooks/useOrderNotifications.js`**
   - Custom hook that polls for new orders
   - Compares current orders with previous state
   - Automatically triggers notifications for new orders

4. **`/app/admin/page.js`**
   - Updated to include NotificationBell component
   - Initialized useOrderNotifications hook
   - Bell icon appears in both mobile and desktop headers

## How It Works

1. When an admin logs into the dashboard, the `useOrderNotifications` hook starts
2. The hook fetches all orders immediately and stores the current order IDs
3. Every 30 seconds, it fetches orders again
4. If new orders are found (orders not in the stored IDs), it creates notifications
5. The notification bell badge updates to show the new unread count
6. Admin can click the bell to view and manage notifications

## Customization

### Change Polling Interval
Edit `/hooks/useOrderNotifications.js`, line with `setInterval`:
\`\`\`javascript
// Change 30000 (30 seconds) to your desired interval in milliseconds
const intervalId = setInterval(checkForNewOrders, 30000);
\`\`\`

### Customize Notification Messages
Edit `/hooks/useOrderNotifications.js`, in the notification creation:
\`\`\`javascript
addNotification({
  title: "New Order Placed!", // Change title here
  message: \`Order from \${order.userData?.name}\`, // Customize message
  type: "order",
  orderId: order._id,
});
\`\`\`

### Style Customization
The NotificationBell component uses Tailwind CSS classes. You can customize:
- Badge color (currently red): Change `bg-red-500`
- Dropdown width: Change `w-80`
- Max height: Change `max-h-[500px]`
- Unread background: Change `bg-blue-50`

## Testing

To manually test the notification system, you can create a test notification by adding this to your admin page temporarily:

\`\`\`javascript
import useNotificationStore from "@/store/admin/notificationStore";

// Inside your component
const { addNotification } = useNotificationStore();

// Test button
<button onClick={() => {
  addNotification({
    title: "Test Notification",
    message: "This is a test notification to verify the system works!",
    type: "test"
  });
}}>
  Test Notification
</button>
\`\`\`

## Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires localStorage support (available in all modern browsers)
- Uses ES6+ features (ensure your Next.js transpilation is configured)

## Future Enhancements

Potential improvements you could add:

1. **Sound Notifications**: Play a sound when a new notification arrives
2. **Browser Notifications**: Use the Notification API for desktop notifications
3. **WebSocket Integration**: Real-time updates instead of polling
4. **Notification Filters**: Filter by type (orders, meetings, etc.)
5. **Notification Settings**: Let admin configure polling interval and notification preferences
6. **Mark as Important**: Star/flag important notifications
7. **Notification Categories**: Group notifications by type with tabs

## Troubleshooting

### Notifications not appearing?
- Check browser console for errors
- Verify the backend API is accessible
- Ensure admin token is valid in the adminStore
- Check that `process.env.BACKEND_URL` is correctly configured

### Badge count incorrect?
- Clear localStorage and refresh: `localStorage.removeItem('admin-notifications')`
- Check browser console for any state management errors

### Dropdown not closing?
- Ensure there are no z-index conflicts with other components
- Check that the click-outside handler is not being prevented

## Support

For issues or questions about the notification system, check:
1. Browser console for error messages
2. Network tab to verify API calls are working
3. Zustand devtools (if installed) to inspect state
