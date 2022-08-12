const db = new Dexie('MyDatabase');

	// Declare tables, IDs and indexes
	db.version(1).stores({
		friends: '++id, name, age'
	});

 