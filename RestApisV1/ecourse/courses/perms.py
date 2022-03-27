from rest_framework import permissions


class CommentOwnerPerms(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, comment):
        """
        Return `True` if permission is granted, `False` otherwise.
        """

        return request.user == comment.user