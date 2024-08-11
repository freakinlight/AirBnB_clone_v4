@app.route('/3-hbnb/')
def hbnb():
    cache_id = uuid.uuid4()
    return render_template('3-hbnb.html', cache_id=cache_id)
