% Load in the flinch data
%flinches = loadFlinchData('supervisorDavidFlinches1516841518310.dat')
%flinches = loadFlinchData('supervisorFlinches1518126409244Dexter.dat')

% Load in the initial reachable set (to be modified)
load('../../reachableSets/dubins_reachset.mat');
visualizeLevelSet(g,data,'surface',0,"before adjustment")

data = data - 1.8;
visualizeLevelSet(g,data,'surface',0,"after after adjustment");
json_export_reachset(data,g,strcat('dubins','Conservative'),"../../reachableSets/");

function value = interpolateValue(state,grid,griddedFunction)
  eqIndex = (state - grid.min)./grid.dx;
  Index(1,:) = floor(eqIndex);
  Index(2,:) = ceil(eqIndex);
  value = griddedFunction(Index(1,1),Index(1,2),Index(1,3));
end