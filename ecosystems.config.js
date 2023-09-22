module.exports = { apps : [
    {
    name: "s34staticdeploy",
    cwd: "/opt/s34staticdeploy",
    watch: true,
    script: "index.js",
    instances: "3",
    exec_mode: "cluster_mode",
    exp_backoff_restart_delay: 100,
    env: {
        SERVICE_END_POINT:"http://localhost:4569",
        DATA_DIR:"",
        BUCKET_NAME:"staticdeploy"
        },
        env_production: {
        NODE_ENV: "production"
        },
        env_development: {
        NODE_ENV: "development"
        }
}
]
}