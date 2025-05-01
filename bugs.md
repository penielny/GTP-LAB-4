# Bugs
 -  changed < to  >  due to a logical error at line 158. which controlled the overlay on the room image
 -  Also did the same changes at line 167 in the setOverlay function which controlled the same overlay displayed on room image. (logical error)
 - Chanaged the option.value from room to room.name, because we used the .name property to filter the available room. initialy it return an unsuable data which was the typeof room as string 
 - Changed selectedRoom initialization from let to var at line 199. because it wasnt reachable by setSelectedRoom function because conflicting names (scope issue)
 - changed line 225 in the setSelectedRoom function. from selectedRoom = room to this.selectedRoom = room.name (scope issue / context issue)
- at line 275 , scope issue / context , dirrect invocked the function instead.
- same issue at line 298 , scope / context issue , dirrect invocked the function instead. 
- cganged classList.contain argument from room-name to switch 

 