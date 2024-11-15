from flask import Flask, render_template, request, jsonify
import pyodbc

app = Flask(__name__)

def connect_to_db():
    conn = pyodbc.connect(
        'DRIVER={ODBC Driver 17 for SQL Server};'
        'SERVER=BETTY;'  
        'DATABASE=Pokedex;'  
        'Trusted_Connection=yes;'
    )
    return conn

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    print(f"Search query received: '{query}'")  # Debugging line

    # Perform the search and retrieve results
    results = perform_search(query) if query else fetch_all_pokemon()

    for result in results:
        print(f"ID: {result.ID}, Name: {result.name}, Ability: {result.abilities}")

    # Return a JSON response with all Pokémon details
    return jsonify([{
        'ID': result.ID, 
        'name': result.name, 
        'type': result.type, 
        'image_url': result.image_url,
        'hp': result.hp,
        'attack': result.attack,
        'defense': result.defense,
        'speed': result.speed,
        'abilities': result.abilities
    } for result in results])


def perform_search(query):
    conn = connect_to_db()
    cursor = conn.cursor()
    results = []
    try:
        # Modify the SQL query to search by name, ID, or type
        cursor.execute("""
            SELECT ID, name, type, image_url, hp, attack, defense, speed, abilities
            FROM Pokemon
            WHERE name LIKE ? OR ID LIKE ? OR type LIKE ?
        """, (f'%{query}%', f'%{query}%', f'%{query}%'))
        
        results = cursor.fetchall()
    except Exception as e:
        print("Error executing search query:", e)
    finally:
        cursor.close()
        conn.close()
    return results



def fetch_all_pokemon():
    conn = connect_to_db()
    cursor = conn.cursor()
    results = []
    try:
        cursor.execute("SELECT * FROM Pokemon")  # Fetch all Pokémon
        results = cursor.fetchall()
    except Exception as e:
        print("Error fetching all Pokémon:", e)
    finally:
        cursor.close()
        conn.close()
    return results

if __name__ == '__main__':
    app.run(debug=True)
