package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L16_Sorting.Assignment;

import java.util.Comparator;
import java.util.List;

class LargeNumberComparator implements Comparator<Integer> {

  @Override
  public int compare(Integer o1, Integer o2) {
    String num1 = o1.toString();
    String num2 = o2.toString();

    String combined1 = num1 + num2;
    String combined2 = num2 + num1;

    return combined2.compareTo(combined1);
  }
}



public class Assignment4 {


  String largestNumber(final List<Integer> A) {

    StringBuilder largestNumber = new StringBuilder();
    LargeNumberComparator comp = new LargeNumberComparator();
    A.sort(comp);

    if (A.getFirst() == 0) {
      return "0";
    }

    for (int num: A) {
      largestNumber.append(num);
    }

    return largestNumber.toString();
  }
}
