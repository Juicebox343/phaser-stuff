export default class BombSpawner{
	constructor(scene, bombKey)
	{
		this.scene = scene
		this.key = bombKey

		this._group = this.scene.physics.add.group()
	}

	get group()
	{
		return this._group
	}

	spawn(playerX = 0)
	{
        const x = Phaser.Math.Between(0, 800)
        const y = Phaser.Math.Between(0, 600)

        const bomb = this.group.create(x, y, this.key)
    
		bomb.setVelocity(-200 || 200)d
		
		return bomb
    }
    
    destroy(){
        
    }
}