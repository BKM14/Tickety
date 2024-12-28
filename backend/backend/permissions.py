from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):

    def has_permission(self, request, views):
        return request.user and request.user.is_superuser

class IsAgentUser(BasePermission):
    def has_permission(self, request, views):
        return request.user and request.user.is_staff