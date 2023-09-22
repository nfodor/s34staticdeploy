module.exports = { apps : [
    {
    name: "s34staticdeploy",
    cwd: "./",
    watch: true,
    script: "index.js",
    instances: "3",
    exec_mode: "cluster_mode",
    exp_backoff_restart_delay: 100,
    env: {
        SERVICE_END_POINT:"http://localhost:4569",
        DATA_DIR:"/Users/nicolasfodor/Documents/dev21-host/setip.io/s3test/s3rver_test_directory",
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