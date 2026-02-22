import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useNotificationStore = create(
    persist(
        (set, get) => ({
            notifications: [],
            unreadCount: 0,

            // Add a new notification
            addNotification: (notification) => {
                const newNotification = {
                    id: Date.now(),
                    timestamp: new Date().toISOString(),
                    read: false,
                    ...notification,
                };

                set((state) => ({
                    notifications: [newNotification, ...state.notifications],
                    unreadCount: state.unreadCount + 1,
                }));
            },

            // Mark a notification as read
            markAsRead: (id) => {
                set((state) => ({
                    notifications: state.notifications.map((notif) =>
                        notif.id === id ? { ...notif, read: true } : notif
                    ),
                    unreadCount: Math.max(0, state.unreadCount - 1),
                }));
            },

            // Mark all notifications as read
            markAllAsRead: () => {
                set((state) => ({
                    notifications: state.notifications.map((notif) => ({
                        ...notif,
                        read: true,
                    })),
                    unreadCount: 0,
                }));
            },

            // Clear all notifications
            clearAllNotifications: () => {
                set({
                    notifications: [],
                    unreadCount: 0,
                });
            },

            // Remove a single notification
            removeNotification: (id) => {
                set((state) => {
                    const notification = state.notifications.find((n) => n.id === id);
                    return {
                        notifications: state.notifications.filter((notif) => notif.id !== id),
                        unreadCount: notification && !notification.read
                            ? Math.max(0, state.unreadCount - 1)
                            : state.unreadCount,
                    };
                });
            },
        }),
        {
            name: 'admin-notifications',
        }
    )
);

export default useNotificationStore;
