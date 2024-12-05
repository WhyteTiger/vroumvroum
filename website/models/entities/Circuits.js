import { Circuit } from "./Circuit.js";

export class Circuits {
	static circuitList = [];
	
	// Charger la liste des circuits depuis LocalStorage
	static loadFromStorage() {
		const savedData = localStorage.getItem("circuits");
		if (savedData) {
			Circuits.deserialize(savedData);
		}
	}
	
	// Sauvegarder la liste des circuits dans LocalStorage
	static saveToStorage() {
		const serializedData = Circuits.serialize();
		localStorage.setItem("circuits", serializedData);
	}
	
	// Ajouter un circuit et sauvegarder
	static add(circuit) {
		if (!(circuit instanceof Circuit)) {
			throw new Error("L'objet doit être une instance de Circuit");
		}
		Circuits.loadFromStorage();  // Charger les données avant l'ajout
		Circuits.circuitList.push(circuit);
		Circuits.saveToStorage();    // Sauvegarder après ajout
	}
	
	// Supprimer un circuit par ID et sauvegarder
	static remove(circuitId) {
		Circuits.loadFromStorage(); // Charger les données avant suppression
		
		// Assurer que circuitId est du même type que celui stocké dans la liste (Number)
		const idToRemove = Number(circuitId);
		Circuits.circuitList = Circuits.circuitList.filter(
			(circuit) => circuit.circuitId !== idToRemove
		);
		Circuits.saveToStorage(); // Sauvegarder après suppression
	}
	
	// Récupérer un circuit spécifique par ID
	static get(circuitId) {
		Circuits.loadFromStorage();  // Charger les données avant la recherche
		return Circuits.circuitList.find((circuit) => circuit.circuitId === Number(circuitId)) || null;
	}
	
	// Retourner tous les circuits
	static getCircuits() {
		Circuits.loadFromStorage();  // Charger les données avant de les retourner
		return Circuits.circuitList;
	}
	
	// Compter le nombre de circuits
	static getCircuitsNumber() {
		Circuits.loadFromStorage();  // Charger les données avant de compter
		return Circuits.circuitList.length;
	}
	
	// Filtrer les circuits avec des critères et pagination
	static getFilteredCircuits(circuitFilter, creatorFilter, page = 0, perPage = 12) {
		Circuits.loadFromStorage();  // Charger les données avant le filtrage
		const filteredCircuits = Circuits.circuitList.filter((circuit) => {
			let matches = true;
			if (circuitFilter) {
				matches = matches && circuit.circuitName.includes(circuitFilter);
			}
			if (creatorFilter) {
				matches = matches && circuit.creatorName === creatorFilter;
			}
			return matches;
		});
		
		// Pagination
		const start = page * perPage;
		const end = start + perPage;
		return filteredCircuits.slice(start, end);
	}
	
	// Sérialiser la liste des circuits
	static serialize() {
		return JSON.stringify(Circuits.circuitList.map((circuit) => circuit.toJSON()));
	}
	
	// Désérialiser et recréer les instances de Circuit
	static deserialize(json) {
		const data = JSON.parse(json);
		// Convertir chaque élément en instance de Circuit
		Circuits.circuitList = data.map(item => {
			const circuit = new Circuit(
				item.circuitName,
				item.creatorName,
				item.creatorTime,
				item.circuitLaps,
				item.matrix
			);
			circuit.circuitId = item.circuitId;
			return circuit;
		});
	}
	
	// Initialiser le chargement depuis localStorage dès le début de l'application
	static async initialize() {
		try {
			for (let i = 1; i < 4; i++) {
				const response = await fetch("../../assets/circuits/Circuit" + i + ".json");
				if (!response.ok) {
					throw new Error(`Erreur HTTP : ${response.status}`);
				}
				const jsonData = await response.json();
				
				// Utiliser la méthode importCircuit pour traiter les données
				const importedCircuits = await Circuits.importCircuit(jsonData);
				console.log(`${importedCircuits.length} circuit(s) importé(s) avec succès.`);
			}
		} catch (error) {
			console.error("Erreur lors de l'importation :", error);
		}
		Circuits.saveToStorage();
	}
	
	static async importCircuit(fileData) {
		try {
			const jsonData = fileData;
			if (Array.isArray(jsonData)) {
				// Si le fichier contient une liste de circuits
				const importedCircuits = jsonData.map((data) => Circuit.fromJSON(data));
				importedCircuits.forEach((circuit) => Circuits.add(circuit));
				return importedCircuits;
			} else {
				// Si le fichier contient un seul circuit
				const importedCircuit = Circuit.fromJSON(jsonData);
				Circuits.add(importedCircuit);
				localStorage.setItem("circuitId", importedCircuit.getCircuitId());
				return [importedCircuit];
			}
		} catch (error) {
			throw new Error("Erreur lors de l'importation du fichier JSON : " + error.message);
		}
	}
}
