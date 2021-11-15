import facebook as fb # works if fb-sdk package properly installed

access_token = 'EAAKQZCZCTUmogBAKwaGtx8qSayov7dErV39b6ZCk3T9N79xqI3vjfvi72DynRn5Vp1KxK5itjuOBZA8ZAtsVZBNis61eEtqQdbMVQpu93uZCSNkGTzlzqAfRzRXyMGCg9KRNhfzYLhJGRlFGZBBWrY6CXGtXpwvRsI6H1Pu4udV0WMjFugPrugazZAz2TClnCCkcN5kYk7DDTZAnrLZBMBSqzhZBZCeTuxx86XrRoPaPluemUiwZDZD'

#connection to the Graph API - graph API object:
socialpolyfb = fb.GraphAPI(access_token)

#post a message on FB:
socialpolyfb.put_object("me", "feed", message = "First SocialPoly automated post from Python")
# ==> return {'id': "pageID_objectID"}

"""
#get the content of a post:
socialpolyfb.get_object("pageID_objectID")
#response.json: {created time, message, id}

#post a photo with caption:
socialpolyfb.put_photo(image, album_path=,**kwargs)
socialpolyfb.put_photo(open("filename.jpg", "rb"), message = "automated image post")
#response.json: {id, post_id}

#comment on a post
socialpolyfb.put_object("post_id", "comments", message = "First SocialPoly automated comment from Python")
#response.json: {id, comment_id}
"""
