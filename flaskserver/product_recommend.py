import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# Load the data
ratings = pd.read_csv('ratings.csv')
products = pd.read_csv('products.csv')

# Merge the data
data = pd.merge(ratings, products, on='product_id')

# Compute user-product matrix
matrix = data.pivot_table(index='user_id', columns='product_id', values='rating')

# Compute pairwise cosine similarity between users
similarities = cosine_similarity(matrix)

# Define a function to recommend products to a user
def recommend(user_id):
    # Get the user's ratings
    user_ratings = matrix.loc[user_id, :]

    # Compute the weighted average rating of each product by the user's similarity with other users
    weighted_ratings = similarities[user_id, :] @ matrix.values / similarities[user_id, :].sum()

    # Filter out products that the user has already rated
    unrated_products = weighted_ratings.index.difference(user_ratings.index)

    # Sort the products by their predicted ratings and return the top 5
    recommendations = weighted_ratings[unrated_products].sort_values(ascending=False).head(5)

    return recommendations.index.tolist()

# Test the recommendation function
user_id = 1
recommended_products = recommend(user_id)
print(f"Recommended products for user {user_id}: {recommended_products}")
