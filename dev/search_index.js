var documenterSearchIndex = {"docs":
[{"location":"API/functions/","page":"Functions","title":"Functions","text":"CurrentModule = ClusterAnalysis","category":"page"},{"location":"API/functions/","page":"Functions","title":"Functions","text":"Documentation of ClusterAnalysis functions.","category":"page"},{"location":"API/functions/","page":"Functions","title":"Functions","text":"Pages = [\"functions.md\"]","category":"page"},{"location":"API/functions/","page":"Functions","title":"Functions","text":"kmeans\ndbscan\neuclidean\nsquared_error\ntotalwithinss","category":"page"},{"location":"API/functions/#ClusterAnalysis.kmeans","page":"Functions","title":"ClusterAnalysis.kmeans","text":"kmeans(table, K::Int; nstart::Int = 1, maxiter::Int = 10, init::Symbol = :kmpp)\nkmeans(data::AbstractMatrix, K::Int; nstart::Int = 1, maxiter::Int = 10, init::Symbol = :kmpp)\n\nClassify all data observations in k clusters by minimizing the total-variance-within each cluster.\n\nArguments (positional)\n\ntable or data: table or Matrix of data observations.\nK: number of clusters.\n\nKeyword\n\nnstart: number of starts.\nmaxiter: number of maximum iterations.\ninit: centroids inicialization algorithm - :kmpp (default) or :random.\n\nExample\n\njulia> using ClusterAnalysis\njulia> using CSV, DataFrames\n\njulia> iris = CSV.read(joinpath(pwd(), \"path/to/iris.csv\"), DataFrame);\njulia> df = iris[:, 1:end-1];\n\njulia> model = kmeans(df, 3)\nKmeansResult{Float64}:\n K = 3\n centroids = [\n     [5.932307692307693, 2.755384615384615, 4.42923076923077, 1.4384615384615382]\n     [5.006, 3.4279999999999995, 1.462, 0.24599999999999997]\n     [6.874285714285714, 3.088571428571429, 5.791428571428571, 2.117142857142857]\n ]\n cluster = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2  …  3, 3, 1, 3, 3, 3, 1, 3, 3, 1]\n within-cluster sum of squares = 78.85144142614601\n iterations = 7\n\nPseudo-code of the algorithm:\n\nRepeat nstart times:  \nInitialize K clusters centroids using KMeans++ algorithm or random init.  \nEstimate clusters.  \nRepeat maxiter times:  \nUpdate centroids using the mean().  \nReestimates the clusters.  \nCalculate the total-variance-within-cluster.  \nEvaluate the stop rule.  \nKeep the best result (minimum total-variance-within-cluster) of all nstart executions.\n\nFor more detailed explanation of the algorithm, check the  Algorithm's Overview of KMeans.\n\n\n\n\n\n","category":"function"},{"location":"API/functions/#ClusterAnalysis.dbscan","page":"Functions","title":"ClusterAnalysis.dbscan","text":"dbscan(df, ϵ::Real, min_pts::Int)\n\nClassify data observations in clusters and noises by using a density concept obtained with the parameters input (ϵ, min_pts).\n\nThe number of clusters are obtained during the execution of the model, therefore, initially the user don't know how much clusters it will obtain. The algorithm use the KDTree structure from NearestNeighbors.jl to calculate the RangeQuery operation more efficiently.\n\nFor more detailed explanation of the algorithm, check the Algorithm's Overview of DBSCAN\n\n\n\n\n\n","category":"function"},{"location":"API/functions/#ClusterAnalysis.euclidean","page":"Functions","title":"ClusterAnalysis.euclidean","text":"ClusterAnalysis.euclidean(a::AbstractVector, b::AbstractVector)\n\nCalculate euclidean distance from two vectors. √∑(aᵢ - bᵢ)².\n\nArguments (positional)\n\na: First vector.\nb: Second vector.\n\nExample\n\njulia> using ClusterAnalysis\n\njulia> a = rand(100); b = rand(100);\n\njulia> ClusterAnalysis.euclidean(a, b)\n3.8625780213774954\n\n\n\n\n\n","category":"function"},{"location":"API/functions/#ClusterAnalysis.squared_error","page":"Functions","title":"ClusterAnalysis.squared_error","text":"ClusterAnalysis.squared_error(data::AbstractMatrix)\nClusterAnalysis.squared_error(col::AbstractVector)\n\nFunction that evaluate the kmeans, using the Sum of Squared Error (SSE).\n\nArguments (positional)\n\ndata or col: Matrix of data observations or a Vector which represents one column of data.\n\nExample\n\njulia> using ClusterAnalysis\n\njulia> a = rand(100, 4);\n\njulia> ClusterAnalysis.squared_error(a)\n34.71086095943974\n\njulia> ClusterAnalysis.squared_error(a[:, 1])\n10.06029322934825\n\n\n\n\n\n","category":"function"},{"location":"API/functions/#ClusterAnalysis.totalwithinss","page":"Functions","title":"ClusterAnalysis.totalwithinss","text":"ClusterAnalysis.totalwithinss(data::AbstractMatrix, K::Int, cluster::Vector)\n\nCalculate the total-variance-within-cluster using the squared_error() function.\n\nArguments (positional)\n\ndata: Matrix of data observations.\nK: number of clusters.\ncluster: Vector of cluster for each data observation.\n\nExample\n\njulia> using ClusterAnalysis\njulia> using CSV, DataFrames\n\njulia> iris = CSV.read(joinpath(pwd(), \"path/to/iris.csv\"), DataFrame);\njulia> df = iris[:, 1:end-1];\njulia> model = kmeans(df, 3);\n\njulia> ClusterAnalysis.totalwithinss(Matrix(df), model.K, model.cluster)\n78.85144142614601\n\n\n\n\n\n","category":"function"},{"location":"algorithms/dbscan/#Overview-of-DBSCAN","page":"DBSCAN","title":"Overview of DBSCAN","text":"","category":"section"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"DBSCAN it's a specific clustering algorithm, very apropriated to spatial data. It's a non-parametric method that apply the concept of density, which beyond identify clusters, it's also able to recognize noise observations. Thus, all those ideas it's inside their name, Density Based Spatial Clustering of Application with Noise (DBSCAN), which classifies it as a density-based clustering non-parametric algorithm. ","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"In a certain way, the algorith try mimic the human hability of recognize groups of points which are close to each other and points which are distant be considered out of the group. ","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"Figure 01 - Spatial Data example from the First Paper of DBSCAN  ","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"<img src=\"../spatial_data.png\" width=\"75%\">","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"This way we could identify points inside a density/cluster and points which isn't in any density cluster, called noises.","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"The user choose the hyperparameters min_points and ϵ, which correspond to the minimum points necessary for a observation be considered a core-point and the radius which every point will calculate the other points who surround them, respectively.","category":"page"},{"location":"algorithms/dbscan/#Logic-of-DBSCAN","page":"DBSCAN","title":"Logic of DBSCAN","text":"","category":"section"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"The algorithm uses two important data structures in your code structure:","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"FIFO queue  ","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"To keep track of the points which are already labelled.","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"KDTree (binary tree)  ","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"Used to make the continuous search of density points in a tree structure. That search feed and use the FIFO queue and this structure make the code be very performatic by using the KDTree struct  from NearestNeighbors.jl package.   ","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"The algorithm sets as a core-point , points which has more than min_points neighbours within this radius ϵ. All the points inside this radius distance it's part of the same cluster (same density). Points with less than min_points neighbours could be labelled as: ","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"Noise  ","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"Because doesn't touchs any point already labelled as cluster.","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"Border point  ","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"Because touchs at least one labelled point, which will also be labelled as the point touched.   ","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"The distance used in this implementation to calculate the point's neighbours is the euclidian distance. In the code, this search for neighbors it's refered as the RangeQuery function and that function it's the most crucial part of the algorithm in question of performancing. Because of that search we incorporate the KDTree structure, cited before, already implemented in NearestNeighbours.jl.","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"Figure 02 - Ilustration of DBSCAN from this Paper  ","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"<img src=\"../DBSCAN_ilustration.png\" width=\"75%\">","category":"page"},{"location":"algorithms/dbscan/#Pseudocode","page":"DBSCAN","title":"Pseudocode","text":"","category":"section"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"We got inspired by this pseudo-code presented in the Paper \"DBSCAN Revisited\". Here, the reader could get a overview of the steps of the code.","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"<img src=\"../pseudo_code.png\" width=\"75%\">","category":"page"},{"location":"algorithms/dbscan/#A-cool-visualization-that-explain-the-algorithm","page":"DBSCAN","title":"A cool visualization that explain the algorithm","text":"","category":"section"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"Now, I need to share with the world this amazing website created by Naftali Harris, from this detailed post about DBSCAN. I crop a gif from this interactive visualization because this way I hope would be easier for the reader connect all the information broughted above.  ","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"<img src=\"../dbscan_video.gif\" width=\"75%\">","category":"page"},{"location":"algorithms/dbscan/#Benchmarking-code","page":"DBSCAN","title":"Benchmarking code","text":"","category":"section"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"using ClusterAnalysis, DataFrames, CSV, BenchmarkTools\n\n# load blob dataset \ndf = CSV.read(\"algo_overview/blob_data.csv\", DataFrame, drop=[1]);\nX = df[:,1:2];\ny = df[:,end];\n\n# parameters of k-means\nϵ = 0.35;\nmin_pts = 10;\n\n# benchmarking algorithm\n@benchmark m = dbscan(X, ϵ, min_pts)","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"<img src=\"../benchmark_dbscan.png\" width=\"75%\">  ","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"Scikit-Learn with C in backend","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"<img src=\"../benchmark_sklearn_dbscan.png\" width=\"75%\">  ","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"R with C++ in backend","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"<img src=\"../benchmark_R_dbscan.png\" width=\"75%\">   ","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"Machine settings used in benchmarking   Processor: Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz   2.71 GHz   RAM: 8,00 GB ","category":"page"},{"location":"algorithms/dbscan/#DBSCAN-Results","page":"DBSCAN","title":"DBSCAN Results","text":"","category":"section"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"using Plots, StatsPlots\n\nm = dbscan(X, ϵ, min_pts);\n\nscatter(X[:,1], X[:,2], zcolor=m.labels, \n        leg=false, \n        title=\"DBSCAN prediction\\n(ϵ=$(ϵ), minPts=$(min_pts))\")","category":"page"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"<img src=\"../plot_dbscan.png\" width=\"75%\">  ","category":"page"},{"location":"algorithms/dbscan/#DBSCAN-Struct","page":"DBSCAN","title":"DBSCAN Struct","text":"","category":"section"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"struct DBSCAN{T<:AbstractFloat, KD<:KDTree}\n    df::Matrix{T}\n    ϵ::T\n    min_pts::Int\n    labels::Vector{Int}\n    tree::KD\n    clusters::Vector{Vector{Int}}\n\n    # Internal Constructor\n    function DBSCAN(df::Matrix{T}, ϵ::T, min_pts::Int) where {T<:AbstractFloat} \n        labels = fill(-1, size(df,1))\n        tree = KDTree(df', leafsize=20)\n        clusters = Vector{Vector{Int}}()\n        KD = typeof(tree)\n\n        new{T, KD}(df, ϵ, min_pts, labels, tree, clusters)\n    end\nend","category":"page"},{"location":"algorithms/dbscan/#References-and-Papers","page":"DBSCAN","title":"References and Papers","text":"","category":"section"},{"location":"algorithms/dbscan/","page":"DBSCAN","title":"DBSCAN","text":"First Paper of DBSCAN.\nDBSCAN Revisited: Why and How You Should (Still) Use DBSCAN.","category":"page"},{"location":"algorithms/kmeans/#Overview-of-K-Means-and-Code","page":"K-Means","title":"Overview of K-Means and Code","text":"","category":"section"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"<img src=\"../kmeans_example.png\" width=\"70%\">  ","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"It's a cluster algorithm based on centroids. The method partitions the data into k clusters, where each observation belongs to a cluster/centroid k_i. The user needs to provide the number of k cluster desired and to choose the ideal number os k, there are some methods such the elbow-plot or the silhuete-plot that could be implemented with this package.  ","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"The K-Means is a iterative method, therefore it optimizes the measure of intra-cluster variance through a sequence of iterations detailed below. There is a equivalence between the sum of squared error (SSE) and the total intra-cluster variance, Kriegel (2016), which allows us optimize the SSE in the code.","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"The inspiration for K-Means came from reading some articles (in the references) and watching Andrew NG lectures and StatQuest videos about it. Then, we start prototype the pseudo-code in Julia, which result in this package.","category":"page"},{"location":"algorithms/kmeans/#Pseudocode","page":"K-Means","title":"Pseudocode","text":"","category":"section"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"Initialize k centroids by K-Means++ algorithm or by random init.\nCalculate the distance of every point to every centroid.\nAssign every point to a cluster, by choosing the centroid with the minimum distance to the point.\nCalculate the Total Variance Within Cluster by the SSE of this iteration.\nRecalculate the centroids using the mean of the assigned points.\nRepeat the steps 3 to 5, maxiter times, until reaching convergence with minimum total variance at step 4.","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"After that, repeat all steps nstart times and select the centroids with the minimum total variance.","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"The default arguments nstart, maxiter and init in the code are 10, 10, and :kmpp, respectively. But could also be changed by the user changing the args in the function kmeans(data, K, nstart=10, maxiter=10), for example.  ","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"The default initialization is the K-Means++ algorithm (:kmpp) because it achieves faster convergence than the random method, which can be changed to random initialization (:random).","category":"page"},{"location":"algorithms/kmeans/#Cool-vizualizations-that-explain-the-K-Means-algorithm","page":"K-Means","title":"Cool vizualizations that explain the K-Means algorithm","text":"","category":"section"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"Figure 01 - From Stanford ML CheatSheet  ","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"<img src=\"../kmeans_stanford_cheatsheet.png\" width=\"50%\">","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"Figure 02 - From K-Means wikipedia page  ","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"<img src=\"../Kmeans_convergence.gif\" width=\"50%\">  ","category":"page"},{"location":"algorithms/kmeans/#Benchmarking-the-algorithm","page":"K-Means","title":"Benchmarking the algorithm","text":"","category":"section"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"# load packages\nusing ClusterAnalysis, RDatasets, DataFrames, BenchmarkTools\n\n# load iris dataset \niris = dataset(\"datasets\", \"iris\");\ndf = iris[:, 1:end-1];\n\n# parameters of k-means\nk, nstart, maxiter = 3, 10, 10;\n\n# benchmarking the algorithm\n@benchmark model = kmeans($df, $k, nstart=$nstart, maxiter=$maxiter)","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"ClusterAnalysis.jl implementation","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"<img src=\"../benchmark_code.png\" width=\"70%\">  ","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"This implementation has an excellent computational performance, being faster than Scikit-Learn's KMeans and very close to the kmeans from R, which call C and FORTRAN in its source code.","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"Scikit-Learn with C in backend","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"<img src=\"../benchmark_sklearn_kmeans.png\" width=\"70%\">  ","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"R with C and FORTRAN in backend","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"<img src=\"../benchmark_R_kmeans.png\" width=\"70%\">   ","category":"page"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"Machine settings used in benchmarking   Processor: Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz   2.71 GHz   RAM: 8,00 GB   ","category":"page"},{"location":"algorithms/kmeans/#References-and-Papers","page":"K-Means","title":"References and Papers","text":"","category":"section"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"First paper that mentioned K-Means.\nPseudo-Code utilized to prototype the first code extracted from the book Information Theory, Inference and Learning Algorithms.\nK-Means++ paper with the KMeans++  initialization that we will add soon.\nStanford Slides about K-Means.\nKriegel, Hans-Peter; Schubert, Erich; Zimek, Arthur (2016). \"The (black) art of runtime evaluation: Are we comparing algorithms or implementations?\". ","category":"page"},{"location":"algorithms/kmeans/#K-Means-Struct","page":"K-Means","title":"K-Means Struct","text":"","category":"section"},{"location":"algorithms/kmeans/","page":"K-Means","title":"K-Means","text":"struct KmeansResult{T<:Real}\n    K::Int\n    centroids::Vector{Vector{T}}\n    cluster::Vector{Int}\n    withinss::T\n    iter::Int\nend","category":"page"},{"location":"#ClusterAnalysis.jl","page":"Home","title":"ClusterAnalysis.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package was Built from scratch, entirely in Julia Lang, and implements a few popular clustering algorithms like K-Means and DBSCAN. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"This is mostly a learning experiment, but the package were also built and documented to be used by anyone, Plug-and-Play. Just input your data as an Array or a Tables.jl type (like DataFrames.jl), then start training your clusters algorithms and analyze your results. ","category":"page"},{"location":"#Algorithms-Implemented","page":"Home","title":"Algorithms Implemented","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Currently we implemented two types of algorithms, a partitioned based (K-Means) and a spatial density based (DBSCAN). ","category":"page"},{"location":"","page":"Home","title":"Home","text":"Go check the Algorithms Section that contains all the details of how it works the algorithm and also got the bibliography and papers used during the research and development of the code.","category":"page"},{"location":"","page":"Home","title":"Home","text":"It's a great introduction to the algorithm and a good resource to read along with the source code.","category":"page"},{"location":"#How-to-install-ClusterAnalysis.jl","page":"Home","title":"How to install ClusterAnalysis.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"# press ] to enter in Pkg REPL mode.\npkg> add ClusterAnalysis","category":"page"},{"location":"#A-quick-example","page":"Home","title":"A quick example","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"using ClusterAnalysis, DataFrames, CSV\n\n# load blob dataset from repo in github\ndf = CSV.read(\"algo_overview/blob_data.csv\", DataFrame, drop=[1]);\nX = df[:,1:2];\ny = df[:,end];\n\n# parameters of k-means\nϵ = 0.35;\nmin_pts = 10;\n\n# executing DBSCAN\nm = dbscan(X, ϵ, min_pts);\n\n# plot\nscatter(X[:,1], X[:,2], zcolor=m.labels, \n        leg=false, \n        title=\"DBSCAN prediction\\n(ϵ=$(ϵ), minPts=$(min_pts))\")","category":"page"},{"location":"","page":"Home","title":"Home","text":"<img src=\"plot_dbscan.png\" width=\"70%\">  ","category":"page"},{"location":"API/types/","page":"Types","title":"Types","text":"CurrentModule = ClusterAnalysis","category":"page"},{"location":"API/types/","page":"Types","title":"Types","text":"Documentation of ClusterAnalysis types.","category":"page"},{"location":"API/types/","page":"Types","title":"Types","text":"Pages = [\"types.md\"]","category":"page"},{"location":"API/types/","page":"Types","title":"Types","text":"KmeansResult\nDBSCAN","category":"page"},{"location":"API/types/#ClusterAnalysis.KmeansResult","page":"Types","title":"ClusterAnalysis.KmeansResult","text":"struct KmeansResult{T<:AbstractFloat}\n    K::Int\n    centroids::Vector{Vector{T}}\n    cluster::Vector{Int}\n    withinss::T\n    iter::Int\nend\n\nObject resulting from kmeans algorithm that contains the number of clusters, centroids, clusters prediction,  total-variance-within-cluster and number of iterations until convergence.\n\n\n\n\n\n","category":"type"},{"location":"API/types/#ClusterAnalysis.DBSCAN","page":"Types","title":"ClusterAnalysis.DBSCAN","text":"struct DBSCAN{T<:AbstractFloat, KD<:KDTree}\n    df::Matrix{T}\n    ϵ::T\n    min_pts::Int\n    labels::Vector{Int}\n    tree::KD\n    clusters::Vector{Vector{Int}}\nend\n\nStruct that contains all the relevant information about the model. The data, ϵ, min_pts, labels, KDTree and clusters. The labels and the clusters are defined during the algorithm inside the routine inside fit!() function, which iterate over every observation p in the dataset.\n\nInternal/External Constructors  \n\nInt - DBSCAN(df::Matrix{T}, ϵ::T, min_pts::Int) where {T<:AbstractFloat}  \nExt - DBSCAN(table, ϵ::Real, min_pts::Int)  \nExt - DBSCAN(df::Matrix{T}, ϵ::Real, minpts::Int) where {T<:AbstractFloat} = DBSCAN(df, T(ϵ), minpts)  \nExt - DBSCAN(df::Matrix{T}, ϵ::Real, minpts::Int) where {T} = DBSCAN(Matrix{Float64}(df), ϵ, minpts)  \n\n\n\n\n\n","category":"type"}]
}
