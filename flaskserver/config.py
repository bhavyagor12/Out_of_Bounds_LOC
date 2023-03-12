from firebase import firebase

# Path: LOC/Out_of_Bounds_LOC-server/flaskserver/config.py
def getFirebase():
    return firebase.FirebaseApplication('https://coupon-generator-a00eb-default-rtdb.asia-southeast1.firebasedatabase.app/', None)