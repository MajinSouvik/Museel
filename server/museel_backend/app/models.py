from django.db import models


# imgUrl1,
#                 imgUrl2,
#                 trackUrl,
#                 previewUrl,
#                 name
# Create your models here.
class Song(models.Model):
    name=models.CharField(max_length=500)
    imgUrl1=models.URLField()
    imgUrl2=models.URLField()
    trackUrl=models.URLField()
    previewUrl=models.URLField()
