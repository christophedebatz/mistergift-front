const path = require('path');
const fs = require('fs');

function ChunksPlugin(configuration) {
    this.configuration = configuration
}

ChunksPlugin.prototype.apply = function(compiler) {
    compiler.plugin('done', function(stats) {
        const statsData = stats.toJson({
            context: compiler.context,
            chunkModules: true
        });

        const assetsByChunkName = statsData.assetsByChunkName;
        const baseUrl = statsData.publicPath;

        let resources = {
            'styles': [],
            'javascripts': [],
        };

        const extMap = {
            '.js': 'javascripts',
            '.css': 'styles',
        }

        function addRessource(resource) {
            const ext = path.extname(resource);
            const resourceKey = extMap[ext];

            if (Object.keys(extMap).includes(ext)) {
                resources[resourceKey].push(baseUrl + resource);
            }
        }

        Object.keys(assetsByChunkName).forEach(function(chunkName) {
            const chunk = assetsByChunkName[chunkName];

            if (Array.isArray(chunk)) {
                chunk.forEach(function(resource) {
                    addRessource(resource);
                })
            } else {
                addRessource(chunk);
            }
        });

        const jsonPath = path.join(compiler.options.output.path, 'webpack-chunks.json');

        fs.writeFileSync(jsonPath, JSON.stringify(resources));
    });
}

module.exports = ChunksPlugin;
