interface Dungeon {
    id: string,
    paths: { 
        id: string, 
        type: 'Story' | 'Explorable' 
    }
}